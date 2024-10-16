import { partnership, people } from "../../utils/image";

const AboutUs = () => {
  return (
    <div className="font-sans bg-gray-100">
      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-8">About Us</h2>
          <div className="mb-16">
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Shwe Pu Zun Bakery & Coffee House, we have proudly served delicious baked goods and beverages since we opened our first shop in 1978 at No 246/248, Anawrahta Road, Lanmadaw Township, Yangon. Over the years, we have expanded with two additional locations—Shop No. 2 in 2005 at No 14(A), Minnandar Road, Dawbon Township, Yangon, and Shop No. 3 in 2010 at Oaktarathiri Township, Nay Pyi Taw. At each of our shops, we offer a variety of bakery items, including cakes, cookies, bread, and pastries, alongside refreshing cold drinks.

We are also deeply involved in agriculture, ensuring the quality of the ingredients we use in our products. We have established Arabica Coffee & Rubber Plantations, as well as a Mango Orchard (Sein-ta-lone), in Yatsauk Township, Southern Shan State, and an additional Arabica Coffee Plantation in Pyin Oo Lwin Township, Mandalay Division. Through these efforts, we are committed to contributing to Myanmar's agricultural sector while offering fresh, high-quality products to our valued customers.
            </p>
          </div>

          {/* Meet Our Team */}
          <div className="mb-16">
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-200 p-5 rounded-lg shadow-md">
                <img
                  src={people.person}
                  alt="Team Member"
                  className="w-full h-64 rounded-md mb-2 object-cover "
                />
                <h4 className="text-xl font-semibold">Thein Zaw</h4>
                <p className="text-gray-600">Founder & Head Baker</p>
                <p className="text-gray-500 mt-2">
                  Zaw is the heart and soul of our bakery, with years of
                  experience crafting delicious pastries that keep customers
                  coming back.
                </p>
              </div>
              
              <div className="bg-gray-200 p-5 rounded-lg shadow-md">
                <img
                  src={people.person2}
                  alt="Team Member"
                  className="w-full h-64 rounded-md mb-2 object-cover "
                />
                <h4 className="text-xl font-semibold">Harry</h4>
                <p className="text-gray-600">Pastry Chef</p>
                <p className="text-gray-500 mt-2">
                  Harry brings creativity and elegance to our pastry selection,
                  always experimenting with new flavors and textures.
                </p>
              </div>

              <div className="bg-gray-200 p-5 rounded-lg shadow-md">
                <img
                  src={people.person1}
                  alt="Team Member"
                  className="w-full h-64 rounded-md mb-2 object-cover "
                />
                <h4 className="text-xl font-semibold">Zaw Lwin Phyo</h4>
                <p className="text-gray-600">Coffee Specialist</p>
                <p className="text-gray-500 mt-2">
                  Jane has a passion for coffee and ensures that every cup
                  served is brewed to perfection, with a dedication to flavor
                  and consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Vision and Mission */}
          <div className="mb-16">
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              Our Vision and Mission
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-lg text-gray-600 max-w-lg mx-auto">
                <h4 className="font-semibold text-gray-800 mb-2">Our Vision</h4>
                <p>
                  To be the leading cafe and bakery in the community, offering
                  delicious products made from the highest quality ingredients
                  while fostering a welcoming and warm environment for everyone.
                </p>
              </div>
              <div className="text-lg text-gray-600 max-w-lg mx-auto">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Our Mission
                </h4>
                <p>
                  Our mission is to serve freshly baked goods and the finest
                  coffees to our customers with a smile. We aim to create a
                  community-driven space where people can relax, connect, and
                  enjoy the little pleasures of life.
                </p>
              </div>
            </div>
          </div>

          {/* Our Partners */}
          <div className="mb-16">
            <h3 className="text-4xl font-semibold text-gray-800 mb-4">
              Our Partners
            </h3>
            <div className="flex justify-center gap-16">
              <div className="flex-shrink-0">
                <img
                  src={partnership.partner}
                  alt="Partner 1"
                  className="w-40 h-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <img
                  src={partnership.partner1}
                  alt="Partner 2"
                  className="w-40 h-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <img
                  src={partnership.partner2}
                  alt="Partner 3"
                  className="w-40 h-40 object-cover object-center"
                />
              </div>
              {/* Add more partner logos as needed */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
