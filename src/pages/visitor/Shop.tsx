import { background } from "../../utils/image";

const Shop = () => {
  const shopLocations = [
    {
      id: 1,
      name: "Downtown Bakery",
      address: "No.79, 9th street, Lanmadaw Township, Yangon, Myanmar",
      phone: "95-1-222305",
      image: background.bg4,
    },
    {
      id: 2,
      name: "Tharketa Bakery",
      address: "No.14-A, Minnandar Road, Dawbon Township, Yangon, Myanmar",
      phone: "95-1-553063",
      image: background.bg5,
    },
    {
      id: 3,
      name: "Nay Pyi Taw Bakery",
      address: "No.42, Oaktarathiri Township, Near InGyinPanWyne, NayPyiTaw, Myanmar",
      phone: "95-1- 222305",
      image: background.bg6,
    },
  ];

  return (
    <div className="font-sans bg-gray-100">
      {/* Shop Page Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Shop Locations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best of our bakery and cafe at any of our three
            convenient locations. Find your nearest shop below!
          </p>
        </div>
      </section>

      {/* Shop Locations Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {shopLocations.map((shop, index) => (
            <div
              key={shop.id}
              className={`flex ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center bg-white shadow-lg rounded-lg overflow-hidden`}
            >
              <div className="w-full md:w-1/2 h-72 md:h-auto">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side - Shop Info */}
              <div className="w-full md:w-1/2 p-6 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {shop.name}
                </h3>
                <p className="text-lg text-gray-600 mt-2">{shop.address}</p>
                <p className="text-lg text-gray-600 mt-2">
                  Phone: {shop.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
