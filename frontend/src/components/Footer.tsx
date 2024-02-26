// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a Footer component for the Travlr.com website

// Footer component definition
const Footer = () => {
    return (
        // Render a footer with a yellow background and padding
        <div className="bg-yellow-400 py-10">
            {/* Container for centering content horizontally */}
            <div className="container mx-auto flex justify-between items-center">
                {/* Branding */}
                <span className="text-3xl text-orange-500 font-bold tracking-tight">
                    Travlr.com
                </span>
                {/* Navigation links */}
                <span className="text-white font-bold tracking-tight flex gap-4">
                    {/* Privacy Policy link */}
                    <p className="cursor-pointer">Privacy Policy</p>
                    {/* Terms of Service link */}
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    );
};

// Export Footer component as default
export default Footer;
