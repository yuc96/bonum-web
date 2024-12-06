const Footer = () => {
   return <div
      style={{
         backgroundColor: 'white',
         margin: '1vh',
         height: window.screen.height * 0.05,
         paddingTop: window.screen.height * 0.012,
         paddingLeft: window.screen.height * 0.012,
      }}
   >
      {/* <div className="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right p-0 pt-0 mt-auto">©  */}
      ©{new Date().getFullYear()}&nbsp;&nbsp;&nbsp;
      <text
         style={{
            color: '#832713',
            fontWeight: 'bold'
         }}
      >
         Physeter
      </text>
   </div>;
};

export default Footer;
