const Footer = () => {
    return (
        <footer className="text-center bg-light pt-1">
            <span>Made with <i className="fa fa-heart"/> by </span>
            <a href={process.env.REACT_APP_AUTHOR_LINKEDIN_URL} target="_blank" rel="noreferrer">
                Vladislav Moroshan
            </a>

            <div>
                <a href={process.env.REACT_APP_GITHUB_URL} target="_blank" rel="noreferrer">
                    <i className="fab fa-github"/> {process.env.REACT_APP_NAME}
                </a>
                <span> ©2022</span>
            </div>
        </footer>
    );
};

export default Footer;
