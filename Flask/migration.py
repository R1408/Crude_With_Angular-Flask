from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from python._init_ import app, db
from python.model import *

# SQLALCHEMY_TRACK_MODIFICATIONS = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
# db.create_all()

if __name__ == '__main__':
    manager.run()
