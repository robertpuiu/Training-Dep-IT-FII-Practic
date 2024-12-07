export const uploadFile = async (file: File) => {
  // TODO: The image will be uploaded to S3 before the form is submitted
  // TODO: The previous image will be deleted from S3 after the form is submitted
  // Delete previous image if it exists
  // if (value.length > 0) {
  //   console.log(value[0]);
  //   await deleteImage(value[0]);
  // }

  //@ts-ignore
  const fileType = encodeURIComponent(file.type);

  const data = await fetch(`/api/s3?fileType=${fileType}`).then((res) =>
    res.json()
  );

  const { uploadUrl, key } = data;

  const { url } = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });

  const imageUrl = url.split("?")[0];

  return imageUrl;
};
