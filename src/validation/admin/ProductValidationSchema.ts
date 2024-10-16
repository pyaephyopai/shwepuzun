import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024 * 2;

export const ProductCreateValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  category_id: Yup.number().required("Category Required"),
  price: Yup.number().required("Price Required"),
  description: Yup.string().required("Description Required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .of(
      Yup.mixed()
        .required("Image is Required")
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) =>
            value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(
              (value as File).type
            )
        )
        .test("fileSize", "File size can't be over 2MB", (value) => {
          return value && (value as File).size <= FILE_SIZE;
        })
    ),
});

export const ProductUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  category_id: Yup.number().required("Category Required"),
  price: Yup.number().required("Price Required"),
  description: Yup.string().required("Description Required"),
});
