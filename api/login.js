import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://ojkxcjtukvubnyohwpso.supabase.co', 'your-public-anon-key'); // Replace with your key

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Use Supabase's Auth to sign in the user
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error || !user) {
            res.status(401).send('Invalid credentials!');
            return;
        }

        // If authentication is successful, send a success message
        res.status(200).send(`Thank you for supporting us, ${user.email}!`);
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
