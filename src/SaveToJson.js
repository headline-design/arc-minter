
import React from "react"
class SaveToJson extends React.Component {
    
    render() {
      return (
    
    <>
      <section >
        
        <p>Send Me a Message</p>
        <form>
        <p>Use this handy contact form to get in touch with me.</p>
          <div className="jss16">
            <input
              id="salutation-mr"
              name="salutation"
              type="radio"
              defaultValue="Mr."
            />
            <label className="inline" htmlFor="salutation-mr">
              Mr.
            </label>
            <input
              id="salutation-mrs"
              name="salutation"
              type="radio"
              defaultValue="Mrs."
            />
            <label className="inline" htmlFor="salutation-mrs">
              Mrs.
            </label>
            <input
              id="salutation-ms"
              name="salutation"
              type="radio"
              defaultValue="Ms."
            />
            <label className="inline" htmlFor="salutation-ms">
              Ms.
            </label>
          </div>
          <div className="jss16">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" />
          </div>
          <div className="jss16">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className="jss16">
            <label htmlFor="subject">How can I help you?</label>
            <select id="subject" name="subject">
              <option>I have a problem.</option>
              <option>I have a general question.</option>
            </select>
          </div>
          <div className="jss16">
            <label htmlFor="message">Enter a Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              cols={65}
              defaultValue={""}
            />
          </div>
          <div className="jss16">
            <p className="group-label">Please send me:</p>
            <input
              id="snacks-pizza"
              name="snacks"
              type="checkbox"
              defaultValue="pizza"
            />
            <label className="inline" htmlFor="snacks-pizza">
              Pizza
            </label>
            <input
              id="snacks-cake"
              name="snacks"
              type="checkbox"
              defaultValue="cake"
            />
            <label className="inline" htmlFor="snacks-cake">
              Cake
            </label>
          </div>
          <input
            name="secret"
            type="hidden"
            defaultValue="1b3a9374-1a8e-434e-90ab-21aa7b9b80e7"
          />
          <button type="submit">Send It!</button>
</form>
      </section>
      <div className="results">
        <h2>Form Data</h2>
        <pre />
      </div>
    </>
    
    
  )
}
}

export default SaveToJson;

