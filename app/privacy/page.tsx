
const pageContents = [
  {
    title: "Purposes of processing",
    body: "dropwishes.com processes your personal data to 1) Draw names and make wish lists. 2) Tailor our website to your wishes and keep track of your personal preferences.4) Analyse and improve our services.4) Inform you about our website. dropwishes.com processes your personal data on the following legal basis: Processing your personal data is necessary to represent the following justified interest(s) of dropwishes.com: Being able to perform the services for which visitors use dropwishes.com, such as drawing names, making wish lists, exchanging both of these and informing users.",
  },
  {
    title: "Your privacy",
    body: "dropwishes.com guarantees your privacy in the following ways: 1) We only process personal data needed to draw names and to make wish lists. 2) We do not provide personal data to third parties such as advertisers. Your e-mail address is only used for e-mails from dropwishes.com. 4) We only place cookies that are necessary for the operation of the website and statistical analysis. These cookies contain anonymous information and stay in your browser for a maximum of one year. 5) We do not place cookies on behalf of third parties (third-party cookies). 6) We encrypt all pages with SSL / HTTPS: the lock in your browser.",
  },
  {
    title: "Analytics",
    body: "dropwishes.com uses Google Analytics to collect anonymous user data for analysis purposes. Statistical analyses of users enable us to continually improve the website. To guarantee your privacy, we have taken the following measures: 1) We use anonymous cookies. 2) We have entered into a processing agreement with Google. 3) The last octet of your IP address is masked. 4) We do not allow Google to share our data. 5) We do not use any other Google services in combination with Google Analytics. 6) You can opt out of Google Analytics.",
  },
 {
    title: "Cookies",
    body: "We use cookies to show you relevant information on other websites and social media. We also use marketing technologies like tracking and conversion pixels to measure and improve the effectiveness of our online ads and website. To guarantee your privacy, we have taken the following measures: 1) You can use the website without accepting marketing cookies by clicking on ‘Do not agree’ 2)during your first visit to the site. 3) We have entered into data processing agreements with the advertising networks we work with. 4) We have not given any advertising networks permission to use the information collected for 5) services they provide to third parties.",
  },
   {
    title: "Provision of personal data",
    body: "If you want to use dropwishes.com you are obliged to enter your name and email address. The following information is not required: gender, age, hobbies & interests, postal address and gift wishes. If you do not provide this personal data to dropwishes.com, the person who draws your name will not have as good an idea of what to get you as when you do.",
  },
    {
    title: "Secure and safe",
    body: "dropwishes.com protects and saves your data in the following ways: 1) We handle your personal data carefully. This means, among other things, that we take adequate technical and organisational measures to secure your personal data and protect it against loss or improper processing. 2) Your personal data is stored in a secure environment and is only accessible to authorised dropwishes.com employees insofar as this is necessary for the processing of your personal data as described in this privacy policy. 3) We do not store your personal data longer than necessary for the purposes for which it is processed. When it is no longer necessary to process your personal data, we will anonymise your personal data.",
  },
    {
    title: "Indemnity",
    body: "This website has been very carefully developed. However, no rights can be derived from the use of dropwishes.com. dropwishes.com does not accept any liability for the non-functioning or incorrect functioning of the website or the non-arrival or late arrival of messages.",
  },
    {
    title: "Automated decision making and / or profiling",
    body: "To tailor the gift finder to your personal preferences and personal characteristics, dropwishes.com makes use of automated decision making (including profiling) based on your personal data. This way we can make sure your Secret Santa gets relevant gift suggestions to increase the chance that you get a gift that fits your profile.",
  },
  {
    title: "Gift ideas and external links",
    body: "dropwishes.com can be used free of charge because of funding from our partners. dropwishes.com shows relevant gift ideas for your celebration. By clicking on a link, you visit a partner’s web shop. Use of these external websites, including ordering gifts, falls outside the responsibility of dropwishes.com.",
  },
    {
    title: "Amazon gifts",
    body: "dropwishes.com is a participant in the Amazon Europe Core S.à r.l. Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk. Certain content that appears on this site comes from Amazon Europe Core S.à r.l. This content is provided ‘as is’ and is subject to change or removal at any time. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.",
  },
    {
    title: "Delete data",
    body: "The person who has set up a group can remove people (names and email addresses) from the group or delete the whole group.",
  },
    {
    title: "Your rights",
    body: "You have the right to submit a request to us to inspect, correct and/or delete your personal data. You also have the right to ask us to limit the processing of your personal data and you are allowed to object to the processing of your personal data. As a data subject you also have the right to request dropwishes.com to recover the personal data you have provided to dropwishes.com in a structured, acceptable form which can be read by machines (data portability).",
  },
     {
    title: "Questions, requests and complaints",
    body: "For questions about this privacy policy and the processing carried out by dropwishes.com, please contact us using the information below. A request for data portability, inspection, correction and/or removal can be submitted by email. This also applies for requests regarding limitations and objections. When you make such a request, we are entitled to ask you for identification. As a data subject you also have the right to file a complaint with the supervisory authority.",
  },
];

const PagePrivacy = ({}) => {
    return (
      <div className={`nc-PageContact overflow-hidden`}>
        <div className="">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Privacy and Terms & Conditions
          </h2>

          <div
          // id="single-entry-content"
          className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
          >

            {pageContents.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.body}
                  </span>
                </div>
            ))}

          </div>
        </div>
      </div>
    )
}
export default PagePrivacy;
