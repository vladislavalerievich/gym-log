const Footer = () => {
    return (
        <footer className="text-center bg-light pt-1">
            <span>Made with &#10084; by </span>
            <a
                href="https://www.linkedin.com/in/vladislavalerievich/"
                target="_blank"
                rel="noreferrer"
            >
                Vladislav Moroshan
            </a>
            <div> ©2022 {process.env.REACT_APP_NAME}</div>
        </footer>
    );
};

export default Footer;
