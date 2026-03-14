export async function showSuccessToast(message: string) {
  const iziToast = (await import("izitoast")).default;

  iziToast.success({
    title: "Success",
    message,
    position: "center",
    backgroundColor: "#3471ff8a",
    titleColor: "#fff",
    messageColor: "#fff",
  });
}
