import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://ojkxcjtukvubnyohwpso.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qa3hjanR1a3Z1Ym55b2h3cHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNjI0NTcsImV4cCI6MjA1OTgzODQ1N30.zP0k1mlxrEyCvV7S-kiXieZyE3M4X1Nni9O75GXyyes');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Query the database for user credentials
        const { data, error } = await supabase
            .from('users')
            .select('fname')
            .eq('email', email)
            .eq('password', password);

        if (error || data.length === 0) {
            res.status(401).send('Invalid credentials!');
            return;
        }

        // Fetch the first name
        const fname = data[0].fname;
        res.status(200).send(`Thank you for supporting us, ${fname}!!`);
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
