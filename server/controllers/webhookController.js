import { verifyWebhook } from "@clerk/express/webhooks";
import { sql } from "../config/db.js";

const syncUser = async (data) => {
    const userId = data.id;
    const emailAddresses = data.email_addresses || [];
    const email =
        emailAddresses.find((address) => address.id === data.primary_email_address_id)?.email_address ||
        emailAddresses[0]?.email_address;

    if (!userId || !email) {
        throw new Error("Clerk user payload is missing an ID or email address");
    }

    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || "User";
    const image = data.image_url || null;

    await sql`
        INSERT INTO users (id, name, email, image, plan)
        VALUES (${userId}, ${name}, ${email}, ${image}, 'free')
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            email = EXCLUDED.email,
            image = EXCLUDED.image,
            updated_at = NOW()
    `;
};

export const handleClerkWebhook = async (req, res) => {
    let event;
    try {
        event = await verifyWebhook(req);
    } catch (error) {
        console.error("Error verifying Clerk webhook:", error);
        return res.status(400).json({ error: "Webhook verification failed" });
    }

    try {
        switch (event.type) {
            case "user.created":
            case "user.updated":
                await syncUser(event.data);
                break;
            case "user.deleted":
                if (event.data.id) {
                    await sql`DELETE FROM users WHERE id = ${event.data.id}`;
                }
                break;
            default:
                console.log(`Unhandled Clerk webhook event type: ${event.type}`);
        }

        return res.status(200).json({ success: true, eventType: event.type });
    } catch (error) {
        console.error("Error processing Clerk webhook:", error);
        return res.status(500).json({ error: "Webhook processing failed" });
    }
};
