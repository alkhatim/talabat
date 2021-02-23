import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Col } from "reactstrap";

const UserCard = ({ user, onDelete }) => {
  const badges = [user.phone, `clients count: ${user.clients}`];

  return (
    <>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody>
            <div className="avatar-sm mx-auto mb-4">
              <span
                className={
                  "avatar-title rounded-circle bg-soft-blue text-blue font-size-16"
                }
              >
                {user.username.charAt(0)}
              </span>
            </div>
            <h5 className="font-size-15">
              <Link
                to={{
                  pathname: `/user/${user._id}`,
                  state: { user },
                }}
                className="text-dark"
              >
                {user.username}
              </Link>
            </h5>
            <p className="text-muted">{user.role}</p>
            <div>
              {badges.map((badge, key) => (
                <Link
                  to="#"
                  className="badge badge-primary font-size-11 m-1"
                  key={"_badge_" + key}
                >
                  {badge}
                </Link>
              ))}
            </div>
          </CardBody>
          <CardFooter className="bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div className="flex-fill">
                <Link
                  to={{
                    pathname: `/user/${user._id}`,
                    state: { user },
                  }}
                >
                  <i className="bx bx-edit-alt" />
                </Link>
              </div>
              <div className="flex-fill">
                <i
                  className="bx bx-trash hand"
                  onClick={() => onDelete(user._id)}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </>
  );
};

export default UserCard;
