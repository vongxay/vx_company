import '../style/Contact.css';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitButton = e.target.querySelector('input[type="submit"]');
        
        try {
            const email = e.target.email.value.trim();
            const message = e.target.message.value.trim();
            
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                throw new Error('Please enter a valid email address');
            }
            
            if (message.length < 5) {
                throw new Error('Message must be at least 5 characters long');
            }

            submitButton.disabled = true;
            submitButton.value = 'Sending...';

            if (!supabase) {
                throw new Error('Cannot connect to the system');
            }

            const formData = {
                name: e.target.name.value.trim(),
                email: e.target.email.value.trim(),
                subject: e.target.subject.value.trim(),
                message: e.target.message.value.trim(),
                created_at: new Date().toISOString()
            };

            const { error } = await Promise.race([
                supabase.from('contacts').insert([formData]),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Connection timeout')), 10000)
                )
            ]);

            if (error) throw error;

            alert('Message sent successfully!');
            e.target.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            alert(`Error: ${error.message || 'Cannot send message. Please try again'}`);
        } finally {
            submitButton.disabled = false;
            submitButton.value = 'Send Message';
        }
    };

    return (
        <section className="contact" id="contact">

        <h1 className="heading"> contact <span> me </span> </h1>
    
        <div className="row">
    
            <div className="image">
                <img className="tilt" src="/images/contact-img.svg" alt="" />
            </div>
    
            <form onSubmit={handleSubmit}>
    
                <div className="inputBox">
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="email" name="email" placeholder="Email" required />
                </div>
    
                <input type="text" name="subject" placeholder="Subject" className="box" required />
    
                <textarea name="message" placeholder="Message" cols="30" rows="10" required></textarea>
    
                <input type="submit" className="btn" value="Send Message" />
    
            </form>
    
        </div>
    
    </section>
    )
}

export default Contact;