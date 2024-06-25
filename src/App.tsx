import { useState } from "react";
import "./App.css";

const EMAIL_DOMAIN_KEY = "eag::domain";

function App() {
  const [domain, setDomain] = useState(
    window.localStorage.getItem(EMAIL_DOMAIN_KEY) ?? ""
  );
  const [service, setService] = useState("");
  const randomString = (Math.random() + 1).toString(36).substring(7);
  const email = `${service.replace(
    /\./g,
    "-"
  )}.${randomString}@${domain.replace(/@/g, "")}`;

  const alias = email.toLowerCase().replace(/\s/g, "");

  const setEmailDomain = (value: string) => {
    setDomain(value);
    window.localStorage.setItem(EMAIL_DOMAIN_KEY, value);
  };

  return (
    <>
      <h1>E-mail alias generator</h1>
      <div className="input-row">
        <label htmlFor="domain-input">E-mail domain</label>
        <input
          id="domain-input"
          type="text"
          value={domain}
          onChange={(e) => setEmailDomain(e.target.value)}
        />
      </div>
      <div className="input-row">
        <label htmlFor="service-input">Service</label>
        <input
          id="service-input"
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <div>
        {domain && service ? (
          <>
            <h3>{alias}</h3>
            <button type="button" onClick={() => copyToClipboard(alias)}>
              Copy to clipboard
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}

const copyToClipboard = (text: string) => {
  return navigator.clipboard.writeText(text);
};

export default App;
