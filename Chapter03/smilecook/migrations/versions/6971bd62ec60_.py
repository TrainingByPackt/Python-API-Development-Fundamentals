"""empty message

Revision ID: 6971bd62ec60
Revises: 1b69a78087e5
Create Date: 2019-10-08 12:11:47.370082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6971bd62ec60'
down_revision = '1b69a78087e5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('bio', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'bio')
    # ### end Alembic commands ###