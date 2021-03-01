import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const SocialSource = () => {
  const socials = [
    {
      title: "Instagram",
      bgColor: "bg-pink",
      iconClass: "mdi-instagram",
      link: "https://www.instagram.com/talabatsd",
    },
    {
      title: "Telegram",
      bgColor: "bg-info",
      iconClass: "mdi-telegram",
      link: "https://web.telegram.org/talabatsd#/im?p=@talabatsd",
    },
    {
      title: "WhatsApp",
      bgColor: "bg-success",
      iconClass: "mdi-whatsapp",
      link: "https://api.whatsapp.com/send?phone=971585258989",
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Social Source</CardTitle>
        <div className="text-center mb-4">
          <div className="avatar-sm mx-auto mb-4">
            <span className="avatar-title rounded-circle bg-soft-primary font-size-18">
              <i className="mdi mdi-facebook text-primary"></i>
            </span>
          </div>
          <p className="font-16 text-muted mb-2"></p>
          <h5>
            <a
              href="https://www.facebook.com/talabatsd"
              target="_blank"
              className="text-dark"
            >
              Facebook - <span className="text-muted font-16">Main Page</span>
            </a>
          </h5>
          <p className="text-muted">
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus tincidunt.
          </p>
          <a
            to="https://www.facebook.com/talabatsd"
            target="_blank"
            className="text-primary font-16"
          >
            Visit <i className="mdi mdi-chevron-right"></i>
          </a>
        </div>
        <Row className="mb-1">
          {socials.map((social, key) => (
            <Col xs="4" key={"_li_" + key}>
              <div
                className="social-source text-center mt-3 hand"
                onClick={() => window.open(social.link, "_blank")}
              >
                <div className="avatar-xs mx-auto mb-3">
                  <span
                    className={
                      "avatar-title rounded-circle " +
                      social.bgColor +
                      " font-size-16"
                    }
                  >
                    <i
                      className={"mdi " + social.iconClass + " text-white"}
                    ></i>
                  </span>
                </div>
                <h5 className="font-size-15">{social.title}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default SocialSource;
