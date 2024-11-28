import { redirect } from "react-router";
import { auth } from "../../auth";

export function cardLoader({ request }) {
    const project_role = 2;
    const user = JSON.parse(localStorage.getItem('sb-uprfurpajbpzdywrkheh-auth-token')).user;
    const user_role = user?.user_metadata.role;
    auth(request);
    console.log(user_role, 'From calender');
    if (user_role >= project_role && user_role !== undefined) {
        return null;
    } else {
        console.log('redirect');
        return redirect('/pricing');
    }
}
