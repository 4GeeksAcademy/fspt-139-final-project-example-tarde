"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TeamMember, Task
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
import json
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/team", methods=["GET"])
def get_team():

    members = db.session.execute(
        select(TeamMember)
    ).scalars().all()

    return jsonify(
        [member.serialize() for member in members])

@api.route("/tasks", methods=["GET"])

def get_tasks():

    tasks = db.session.execute(
        select(Task)
    ).scalars().all()

    return jsonify(
        [task.serialize() for task in tasks]
    ), 200


@api.route("/seed", methods=["GET"])
def seed_database():
    base_path = os.path.join(
        os.path.dirname(__file__),
        "data"
    )

    with open(
        os.path.join(base_path, "team.json"),
        "r",
        encoding="utf-8"
    ) as file:
        team_data = json.load(file)

    tasks_created = 0
    members_created = 0

    # Team members
    for member_data in team_data:
        existing_member = db.session.execute(
            select(TeamMember).where(
                TeamMember.name == member_data["name"],
                TeamMember.role == member_data["role"]
            )
        ).scalar_one_or_none()

        if existing_member is None:
            new_member = TeamMember(
                name=member_data["name"],
                role=member_data["role"]
            )

            db.session.add(new_member)
            members_created += 1
    with open(
        os.path.join(base_path, "tasks.json"),
        "r",
        encoding="utf-8"
    ) as file:
        tasks_data = json.load(file)

    tasks_created = 0

    # Tasks
    for task_data in tasks_data:
        existing_task = db.session.execute(
            select(Task).where(
                Task.title == task_data["title"]
            )
        ).scalar_one_or_none()

        if existing_task is None:
            new_task = Task(
                title=task_data["title"],
                completed=task_data["completed"]
            )

            db.session.add(new_task)
            tasks_created += 1

    db.session.commit()

    return jsonify({
        "message": "Database seed completed",
        "created": {
            "team_members": members_created,
            "tasks": tasks_created,
        }
    }), 200
