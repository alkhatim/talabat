import { memo } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label, Row } from "reactstrap";

const EnquiryComments = memo(
  ({ enquiry, onCommentChange, onAddComment, newComment }) => {
    return (
      <Card>
        <CardBody>
          <h5 className="font-size-15">
            <i className="bx bx-message-dots text-muted align-middle mr-1"></i>{" "}
            Comments :
          </h5>

          {enquiry.comments.map((comment) => (
            <div>
              <div className="media py-3">
                <div className="avatar-xs mr-3">
                  <div className="avatar-title rounded-circle bg-light text-primary">
                    {comment.createdBy.username.charAt(0)}
                  </div>
                </div>
                <div className="media-body">
                  <h5 className="font-size-14 mb-1">
                    {comment.createdBy.username}
                    <small className="text-muted float-right">
                      {new Date(comment.createdAt).toLocaleString([], {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </h5>
                  <p className="text-muted">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h5 className="font-size-16 mb-3">Add a comment</h5>
            <Form>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Input
                  id="newComment"
                  name="newComment"
                  type="textarea"
                  maxLength="256"
                  rows="3"
                  placeholder="Your comment..."
                  className="form-control"
                  value={newComment}
                  onChange={onCommentChange}
                />
              </FormGroup>
            </Form>
            <div className="text-right">
              <button onClick={onAddComment} className="btn btn-success w-sm">
                <i className="bx bx-check-double font-size-16 align-middle mr-2" />
                Submit
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
);

export default EnquiryComments;
