export async function convertHeicToJpg(imageToConvert) {
    // This module will only be loaded on the client side
    const heic2any = (await import("heic2any")).default;
  
    const convertedBlob = await heic2any({
      blob: imageToConvert,
      toType: "image/jpg",
      quality: 1,
    });
  
    const fileNameNoExt = imageToConvert.name.replace(/\.[^/.]+$/, "");
  
    const convertedFile = new File(
      [convertedBlob],
      `${fileNameNoExt}.jpg`,
      {
        type: "image/jpg",
      }
    );
  
    return convertedFile;
}