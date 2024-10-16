import { agricultural } from "../../utils/image";

const Agricultural = () => {
  return (
    <div>
      {/* Our Farm Section */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-4">Our Farm</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our bakery and café take pride in using fresh, high-quality
            ingredients that come directly from our own farm. From the coffee
            beans to the dairy and wheat, everything is carefully grown,
            harvested, and used to create the best products for our customers.
          </p>
          <div className="mt-8">
            <img
              src={agricultural.farm}
              alt="Our Farm"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Homegrown Products Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Homegrown Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Coffee */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src={agricultural.coffee}
                alt="Coffee"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Coffee</h3>
              <p className="text-gray-600">
                Our coffee beans are grown on our farm, carefully roasted, and
                served fresh in our café for the perfect cup every time.
              </p>
            </div>

            

            {/* Wheat */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src={agricultural.wheat}
                alt="Wheat"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Wheat</h3>
              <p className="text-gray-600">
                Our bakery products are made with wheat that we grow on our
                farm, producing the freshest breads and pastries.
              </p>
            </div>
            {/* Dairy */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src={agricultural.milk}
                alt="Milk"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Milk</h3>
              <p className="text-gray-600">
                We use fresh, organic milk from our dairy farm in all of our
                baked goods and drinks, ensuring the highest quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-8">
            Sustainability
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We are committed to sustainable farming practices. By minimizing
            waste, using eco-friendly farming techniques, and ensuring animal
            welfare, we create a better future for the planet and our community.
          </p>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Promise</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We promise to deliver only the freshest and highest quality
            ingredients, grown and sourced from our own farm. With every
            product, we guarantee the utmost care and attention, ensuring that
            our customers get the best of what we have to offer.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Agricultural;
