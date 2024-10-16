import { Link } from "react-router-dom";
import { image } from "../../utils/image";

const Services = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Our Services
      </h1>

      {/* Services Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Birthday Program */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={image.image1}
              alt="Birthday Program"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Birthday Program
            </h2>
            <p className="text-gray-600 mb-4">
              Celebrate your special day with us! Our birthday program offers a
              delightful experience with custom cakes, decorations, and catering
              options to make your day unforgettable.
            </p>
            <Link
              to="/contact-us"
              className=" text-white py-2 px-4 rounded bg-cta hover:bg-hcta transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Bakery Class */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 order-last md:order-first md:pl-8">
            <img
              src={image.image2}
              alt="Bakery Class"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Bakery Class
            </h2>
            <p className="text-gray-600 mb-4">
              Learn the art of baking from our skilled chefs! Join our bakery
              class and master techniques for making bread, pastries, and more,
              using fresh ingredients from our farm.
            </p>
            <Link
              to="/contact-us"
              className=" text-white py-2 px-4 rounded bg-cta hover:bg-hcta transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Barista Class */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={image.image3}
              alt="Barista Class"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Barista Class
            </h2>
            <p className="text-gray-600 mb-4">
              Become a coffee expert with our barista class! Learn the
              essentials of brewing coffee, milk frothing techniques, and
              creating latte art in our hands-on workshops.
            </p>
            <button className="bg-cta hover:bg-hcta text-white py-2 px-4 rounded transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 order-last md:order-first md:pl-8">
            <img
              src={image.image4}
              alt="Catering Service"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Catering Service
            </h2>
            <p className="text-gray-600 mb-4">
              Let us bring the bakery and café experience to your event! Our
              catering service provides custom menus, including fresh baked
              goods and coffee, perfect for any occasion.
            </p>
            <Link
              to="/contact-us"
              className=" text-white py-2 px-4 rounded bg-cta hover:bg-hcta transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
