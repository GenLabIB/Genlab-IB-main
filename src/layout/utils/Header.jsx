import React, {
  useRef,
  useEffect,
  Fragment,
  useContext,
  useState,
} from "react";
import logo from "@/assets/logo/Logo2.png";
import headerStyles from "@/layout/utils/Header.module.css";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ModalContext } from "@/context/ModalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import Image from "next/image";

const Header = () => {
  const { modalOpen, closeModal: close, openModal } = useContext(ModalContext);
  const navbarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validateForm = () => {
    let isValid = true;

    const nameRegex = /^[A-Za-z\s.]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{8,}$/;

    if (!name.match(nameRegex)) {
      setNameError("Please enter a valid name.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!mobile.match(mobileRegex)) {
      setMobileError(
        "Please enter a valid mobile number with at least 8 digits."
      );
      isValid = false;
    } else {
      setMobileError("");
    }

    if (!email.match(emailRegex)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const templateParams = {
        name,
        mobile,
        email,
      };

      emailjs
        .send(
          "service_twjdkap", // Replace with your EmailJS service ID
          "template_veofnfx", // Replace with your EmailJS template ID
          templateParams,
          "5Czk5Gi-bcnN23oyr" // Replace with your EmailJS user ID
        )
        .then(
          (response) => {
            toast.success("Form submitted successfully!");
            closeModal();
          },
          (error) => {
            toast.error("Failed to send the form. Please try again.");
          }
        );
    }
  };

  // Reset form fields when closing the modal
  const closeModal = () => {
    setName("");
    setMobile("");
    setEmail("");
    setNameError("");
    setMobileError("");
    setEmailError("");
    close();
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <Fragment>
      <div className={headerStyles.navbar} ref={navbarRef}>
        <div className={headerStyles.navbar_container}>
          <div className={headerStyles.navbar_links}>
            <div className={headerStyles.navbar_links_Image}>
              <Image
                src={logo.src}
                alt="Genlab IB logo"
                onClick={() => window.scrollTo(0, 0)}
                width={100} // Set width
                height={100} // Set height
                layout="intrinsic"
              />
            </div>
            <div>
              <ul className={menuOpen ? headerStyles.show_nav : ""}>
                <li onClick={() => scrollToSection("product")}>Explore</li>
                <li onClick={() => scrollToSection("pricing")}>Join Us</li>
                <li onClick={() => scrollToSection("approach")}>
                  Opportunities
                </li>
              </ul>
            </div>
          </div>
          <div className={headerStyles.navbar_btn_container}>
            <button onClick={openModal}>Get Started</button>
          </div>
          <button
            className={`${headerStyles.hamburger} ${
              menuOpen ? headerStyles.hamburger_open : ""
            }`}
            onClick={toggleMenu}
          >
            <div />
            <div />
            <div />
          </button>
        </div>
      </div>
      <Modal open={modalOpen} onClose={closeModal} showCloseIcon={false}  focusTrapped={false}  center>
        <div className={headerStyles.apply_now_modal}>
          <div className={headerStyles.apply_now_modal_container2}>
            <h3>
              Have questions or ideas?<br></br> We&rsquo;re here to help!
            </h3>
            <p>
              Drop your details, and we&rsquo;ll get back to you to start
              building something extraordinary together.
            </p>
            <div className={headerStyles.form_phone_new_contents2}>
              <p>If you need any assistance please contact :</p>
              <div>
                <a href="tel:9994535635">+91 9994535635</a>
                <a href=""> | </a>
                <a href="mailto:henrich.genlabib@gmail.com">
                  henrich.genlabib@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className={headerStyles.apply_now_modal_container}>
            <h3>
              Have questions or ideas?<br></br> We&rsquo;re here to help!
            </h3>
            <div className={headerStyles.apply_now_modal_container_item}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              />
              <label
                className={`${headerStyles.floatingLabel2} ${
                  name ? headerStyles.filled : ""
                }`}
              >
                Enter your name
              </label>

              <p
                className={headerStyles.error}
                style={{ display: nameError ? "block" : "none" }}
              >
                {nameError}
              </p>
            </div>

            <div className={headerStyles.apply_now_modal_container_item}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              
              />
              <label
                className={`${headerStyles.floatingLabel2} ${
                  email ? headerStyles.filled : ""
                }`}
              >
                Enter your email
              </label>

              <p
                className={headerStyles.error}
                style={{ display: emailError ? "block" : "none" }}
              >
                {emailError}
              </p>
            </div>

            <div className={headerStyles.apply_now_modal_container_item}>
              <div className={headerStyles.form_phone_new_input}>
                <PhoneInput
                  country={"in"}
                  value={mobile}
                  onChange={(phone) => setMobile(phone)}
                  onFocus={() => setIsFocused(true)} // Set focus state
                  onBlur={() => setIsFocused(false)} // Reset focus state
                  placeholder="" // Disable default placeholder
                  containerClass={headerStyles.customPhoneInputContainer}
                  inputClass={headerStyles.customPhoneInput}
                  buttonClass={headerStyles.customPhoneInputButton}
                  dropdownStyle={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                  }}
                />
                {/* Floating label */}
                <label
                  className={`${headerStyles.floatingLabel} ${
                    mobile || isFocused ? headerStyles.filled : ""
                  }`}
                >
                  Enter your phone number
                </label>
              </div>
              {/* Error message */}
              <p
                className={headerStyles.error}
                style={{ display: mobileError ? "block" : "none" }}
              >
                {mobileError}
              </p>
            </div>

            <div className={headerStyles.form_phone_new_button}>
              <button onClick={handleSubmit}>Send Message</button>
            </div>

            <div className={headerStyles.form_phone_new_contents}>
              <p>If you need any assistance please contact :</p>
              <div>
                <a href="tel:9994535635">+91 9994535635</a>
                <a href=""> | </a>
                <a href="mailto:henrich.genlabib@gmail.com">
                  henrich.genlabib@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};

export default Header;
