import { background } from "../utils/image";
import { useQuery } from "@tanstack/react-query";
import { getAllProductUser } from "../api/ProductService";
import { PlayArrowRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["product-home"],
    queryFn: async () =>
      getAllProductUser("limit=3").then((response) => response.data.data),
  });

  const handlePlayButtonClick = () => {
    window.location.href = "https://youtu.be/zUW5V4svhYk?si=kVOznkk5ct3gJLzY";
  };

  return (
    <>
      <div>
        <section
          className="h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${background.bg})`,
            height: "calc(100vh - 80px)",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white p-5">
            <div className="">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to Shwe Pu Zun
              </h1>
              <p className="text-lg">
                Experience the finest pastries and coffee, made fresh every day.
              </p>
            </div>
          </div>
        </section>

        {/* Our Specialties Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Specialties
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Indulge in our finest collection of baked goods and beverages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {data?.map((product: ProductCard) => (
                <div
                  className="bg-gray-200 p-5 rounded-lg shadow-md"
                  key={product.id}
                >
                  <img
                    src={product.image_url}
                    alt="Product"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div>
          {/* First section: Info on the left, Image on the right */}
          <InfoImageSection
            reverse={false}
            imageSrc={background.bg4}
            title="Who We Are"
            description="Welcome to Shwe Pu Zun Bakery & Coffee House, where our passion for baking and brewing comes to life every day. We are a cafe and bakery shop that takes pride in serving freshly made, delicious products to our customers. From a wide range of handcrafted pastries, cakes, and bread to freshly brewed coffee, every item we offer is made with care and the finest ingredients to ensure quality and flavor in every bite.

            At Shwe Pu Zun, we believe in the importance of freshness, and that is why we bake daily, ensuring that our customers enjoy products that are always made to perfection. Whether you are looking for a morning coffee, a quick snack, or a special cake for an event, we have something to satisfy every craving. Our warm and inviting atmosphere makes us the perfect place to relax, catch up with friends, or even work remotely. 

            Beyond our physical store, we also offer a seamless online ordering experience, making it easy for you to enjoy our products wherever you are. Visit us today or explore our online shop to discover why we are a favorite destination for bakery lovers in Myanmar. We look forward to serving you!"
          />
        </div>

        <div
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(${background.bg1})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute w-40 h-40 bg-transparent rounded-full animate-ping border-2 border-indigo-300"></div>
            <div className="absolute w-32 h-32 bg-transparent rounded-full animate-ping delay-100 border-2 border-indigo-400"></div>
            <div className="absolute w-24 h-24 bg-transparent rounded-full animate-ping delay-200 border-2 border-indigo-500"></div>

            <button
              onClick={handlePlayButtonClick}
              className="w-20 h-20 bg-white rounded-full absolute z-50 shadow-lg flex justify-center items-center transition-transform duration-300 hover:scale-110"
            >
              <PlayArrowRounded
                sx={{
                  fontSize: "25px",
                }}
              />
            </button>
          </div>
        </div>

        {/* Location Map Section */}
        <section className="py-20 ">
          <div className="mx-auto text-center px-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Location
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1939557.9562413616!2d94.8490496691618!3d18.292499375073064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ecd8649d3a63%3A0x3c563d27d359780d!2sShwe%20Pu%20Zun%20Cafeteria%20%26%20Bakery%20House!5e0!3m2!1sen!2ssg!4v1728233203998!5m2!1sen!2ssg" 
            title="Cafe Location"
            width="100%"
            height="100%"
            className="border-0"
            loading="lazy"
            ></iframe>
            </div>
          </div>
        </section>

        <div className="py-16 bg-slate-200">
          <div className="container mx-auto text-center px-4">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Order Now</h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8">
              Enjoy our fresh and delicious bakery items delivered right to your
              door. Order online and experience the taste of our handcrafted
              pastries and coffee.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => (window.location.href = "/products")}
              className="bg-cta py-3 px-8 rounded-lg shadow-lg text-lg font-semibold hover:bg-hcta transition-transform duration-300 transform hover:scale-105"
            >
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoImageSection = ({
  reverse,
  imageSrc,
  title,
  description,
}: {
  reverse: boolean;
  imageSrc: string;
  title: string;
  description: string;
}) => {
  return (
    <div
      className={`flex justify-center flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } my-8 items-center`}
    >
      {/* Image */}
      <div className="md:w-1/2 w-full p-4 flex justify-end">
        <img
          src={imageSrc}
          alt={title}
          className="w-fit h-[450px] object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="md:w-1/2 w-full p-4">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to="/about-us"
          className="bg-cta py-2 px-4 rounded-lg shadow hover:bg-hcta transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;
