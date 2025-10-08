
import DarkClass from "../../components/classes/DarkClass";
import ContactV1 from "../../components/contact/ContactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";

import ThemeDark from "../../components/switcher/ThemeDark";

const ContactUsPage = () => {
    return (
        <>
            <LayoutV1>
                <ContactV1 />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ContactUsPage;