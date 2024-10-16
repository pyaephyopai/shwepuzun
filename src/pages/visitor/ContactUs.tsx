import {
  EmailRounded,
  LocationOnRounded,
  PhoneRounded,
} from "@mui/icons-material";
import { useFormik } from "formik";
import FormInput from "../../components/form/FormInput";
import { postContact } from "../../api/contactService";
import { alertStore } from "../../store/alertStore";
import { ContactValidationSchema } from "../../validation/ContactValidationSchema";

const ContactUs = () => {
  const { setAlert } = alertStore();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: ContactValidationSchema,
    onSubmit: async (values) => {
      await postContact(values).then((response) => {
        if (response.data.code === 201) {
          setAlert(true, response.data.message, "success");
          resetForm();
        }
      });
    },
  });

  return (
    <div className="container mx-auto py-16 px-4">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">
        Contact Us
      </h1>

      {/* Contact Info Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit}>
            <FormInput
              name="name"
              label="Name"
              required={true}
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.name}
              touch={touched.name}
              sx={{
                marginBottom: "15px",
              }}
            />
            <FormInput
              name="email"
              label="Email"
              required={true}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.email}
              touch={touched.email}
              sx={{
                marginBottom: "15px",
              }}
            />
            <FormInput
              name="message"
              label="Message"
              required={true}
              value={values.message}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.message}
              touch={touched.message}
              row={5}
              sx={{
                marginBottom: "15px",
              }}
            />
            <button
              type="submit"
              className="bg-cta hover:bg-hcta py-2 px-4 rounded-lg  transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col  bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Contact Information
          </h2>
          {/* Address */}
          <div className="flex items-center mb-6">
            <LocationOnRounded className="text-black mr-4" fontSize="medium" />
            <div>
              <p className="text-gray-800 font-semibold">Address:</p>
              <p className="text-gray-600">
              Shop (1)   No.246,248,  Anawrahta Road, Lanmadaw Township, Yangon, Myanmar.<br/>
              Shop (2)  No.14-A,  Minnandar  Road, Dawbon Township, Yangon, Myanmar.<br/>
              Shop(3)   No.42, Oaktarathiri Township, Near InGyinPanWyne, NayPyiTaw, Myanmar.
              </p>
            </div>
          </div>
          {/* Phone */}
          <div className="flex items-center mb-6">
            <PhoneRounded className="text-black mr-4" fontSize="medium" />
            <div>
              <p className="text-gray-800 font-semibold">Phone:</p>
              <p className="text-gray-600">95-1- 222305, 211709, 227171</p>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center mb-6">
            <EmailRounded className="text-black mr-4" fontSize="medium" />
            <div>
              <p className="text-gray-800 font-semibold">Email:</p>
              <p className="text-gray-600">shwepuzun@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="w-full h-80">

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.4272807837074!2d96.19144292536427!3d16.80514603200179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ecd8649d3a63%3A0x3c563d27d359780d!2sShwe%20Pu%20Zun%20Cafeteria%20%26%20Bakery%20House!5e0!3m2!1sen!2ssg!4v1728236291063!5m2!1sen!2ssg"
      className="w-full h-full rounded-lg shadow-lg"
      title="Bakery and Cafe Location"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      >
      </iframe>
      </div>
    </div>
  );
};

export default ContactUs;
