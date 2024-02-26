// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a Hero component for the Travlr.com website

// Hero component definition
const Hero = () => {
    return (
        // Render a hero section with a yellow background and bottom padding
        <div className="bg-yellow-400 pb-16">
            {/* Container for centering content horizontally and arranging vertically */}
            <div className="container mx-auto flex flex-col gap-4">
                {/* Main heading */}
                <h1 className="text-5xl text-black font-bold">Discover your perfect getaway today!</h1>
                {/* Subheading */}
                <p className="text-xl text- font-bold">
                    Explore top hotel deals and travel to your dream getaway for less...
                </p>
            </div>
        </div>
    );
};

// Export Hero component as default
export default Hero;
