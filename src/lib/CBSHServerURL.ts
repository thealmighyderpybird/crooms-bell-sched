import {env} from "~/env";
const CBSHServerURL = env.NODE_ENV === "development" ? "http://192.168.1.78:3000" : "https://api.croomssched.tech";
export default CBSHServerURL;