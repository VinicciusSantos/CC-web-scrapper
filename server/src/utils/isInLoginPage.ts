export default function isInLoginPage($: cheerio.Root): boolean {
  const res = $("#loginFormFields");
  return res.length > 0;
}
