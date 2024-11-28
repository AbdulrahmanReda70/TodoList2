import { redirect } from "react-router";
import { auth } from "../../auth";

export function todoListLoader({ request }) {
    const project_role = 1;
    const user = JSON.parse(localStorage.getItem('sb-uprfurpajbpzdywrkheh-auth-token')).user;
    const user_role = user?.user_metadata.role;
    auth(request);
    console.log(user_role, 'From calender');
    if (user_role >= project_role && user_role !== undefined) {
        return null;
    } else {
        return redirect('/pricing');
    }
}
