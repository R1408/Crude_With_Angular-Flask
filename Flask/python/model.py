from python._init_ import db

class users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(30))
    password = db.Column(db.String(30))

    def serialize(self):
         return {'id':  self.id, 'first_name': self.first_name, 'last_name': self.last_name, 'email':self.email, 'password': self.password}
