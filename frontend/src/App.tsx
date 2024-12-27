import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage} from "./views/mainPage";
import {CreateEventPage} from "./views/createPage";
import {EventPage} from "./views/eventPage";
import {LoginPage} from "@/views/loginPage/LoginPage.tsx";
import {AboutPage} from "@/views/aboutPage";
import {FaqPage} from "@/views/faqPage";
import {PrivacyPolicyPage} from "@/views/privacyPolicyPage";
import {TermsPage} from "@/views/termsPage";
import axios from "axios";
import {UserApi} from "@/models/user.ts";
import {useUserStore} from "@/stores/user/userStore.ts";
import {useEffect} from "react";

function App() {
    const { setUser } = useUserStore();

    const getUserInfo = async () => {
        const { data } = await axios.get<UserApi>(`/api/auth/info`)
        setUser(data)
    }

    useEffect(() => {
        (async () => {
            await getUserInfo()
        })()
    }, []);

    return (
        <Router>
            <Routes>
                <Route index path="/" element={<MainPage/>}/>
                <Route path="/create" element={<CreateEventPage/>}/>
                <Route path="/contact" element={<EventPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/faq" element={<FaqPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path='/policy' element={<PrivacyPolicyPage/>}/>
                <Route path='/terms' element={<TermsPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
