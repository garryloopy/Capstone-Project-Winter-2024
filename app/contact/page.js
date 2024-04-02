import ContactForm from "@/components/ContactForm";
import SubHeader from "@/components/SubHeader";

// The business email
const BUSINESS_EMAIL = "francessicam@gmail.com";

/**
 * Represents a contact us page component
 * @returns A contact page component
 */
const ContactPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <SubHeader header2="Contact Us" />

      <div className="min-h-screen w-full flex justify-center items-start py-12">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
