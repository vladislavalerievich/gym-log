const Footer = () => {
    return (
        <footer className="text-center bg-light pt-1">
            <span>Made with <i className="fa fa-heart"/> by </span>
            <a
                href={process.env.REACT_APP_AUTHOR_LINKEDIN_URL}
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
