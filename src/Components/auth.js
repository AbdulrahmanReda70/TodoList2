import { redirect } from "react-router";
export function auth(request) {
    const { url } = request;
    console.log('there');
    const pathName = new URL(url).pathname; // the url that the user came from we will pass it as a search param
    const check_if_token = localStorage.getItem('sb-uprfurpajbpzdywrkheh-auth-token');
    // check if there user logged 
    if (check_if_token) {
        return null;
    } else {
        const response = redirect(`/login?message=You should login first&location=${pathName}`);
        throw response;
    }
}
