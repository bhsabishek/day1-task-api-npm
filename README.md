# Day 1 - "Works on my machine"

**Stack:** Node.js 22 + Express (in-memory Tasks API)
**Tools today:** Git (L1) · GitHub Actions (L1) · Docker (L1) · Linux/curl (L1)
**Time box:** about 2 hours (take longer if you need it)

## The ticket

> A teammate handed over this Tasks API. It "works on his laptop", but the tests
> are red, nobody has ever run it in a container, and there is no pipeline.
> Get it fixed, put it behind a CI pipeline, containerize it, and deploy it.

## API contract

| Method | Path | Expected behaviour |
|--------|------|--------------------|
| GET | `/health` | `200` `{ "status": "ok" }` |
| GET | `/tasks` | `200` list of tasks |
| POST | `/tasks` | `201` created task. `400` if title is missing, blank, or over 100 chars |
| PATCH | `/tasks/:id/complete` | `200` task with `done: true`. `404` if the id does not exist |
| DELETE | `/tasks/:id` | `204`. `404` if the id does not exist |

Ids must stay unique for the life of the process. The server must read its port
from the `PORT` environment variable (default 3000).

## Your job

**Part 1 - Fix the app** (do this first, before any DevOps)
- Get `npm test` fully green and the app running locally (`curl` it).
- There are several defects. Some only show up outside your own machine
  (CI, a container, a different server). Keep a list as you find them.

**Part 2 - Git**
- Create a **public** GitHub repo and push the project using a feature branch and a
  pull request (not straight to `main`).
- Your repo must not contain `node_modules`.

**Part 3 - CI with GitHub Actions** (you write the workflow)
- Runs on every push and every pull request.
- Installs dependencies with caching, then runs the tests.
- A second job, only if the tests pass: build a Docker image and prove the
  container works by calling `/health` inside the pipeline. The job must fail if it doesn't.

**Part 4 - Docker** (you write the Dockerfile)
- Production-style image: runs the app, no dev tooling, does not run as root.

**Part 5 - Deploy**
- Run your container on your Mac **or** an EC2 instance.
- Prove it by calling `/health` from **outside** the container (from your own
  terminal or browser, not from inside the container).
- Create a task via `POST`, then list it back.

## Done when (send me these)
1. Link to your GitHub repo and the PR.
2. Screenshot or log of a **red** pipeline run and the later **green** one.
3. Evidence the second run used the cache.
4. Output of your `curl` calls against the deployed container.
5. Your documentation (template below).

## Documentation template (one markdown file)
1. **Scenario** - what was asked, in your own words
2. **Bugs found** - for each: symptom, root cause, fix, and where it showed up (laptop / CI / container)
3. **Pipeline** - what each job and step does and why
4. **Dockerfile** - why each instruction is there
5. **Deployment** - where, how, and how you verified it
6. **Errors you hit along the way** and how you got unstuck
7. **Clean-up** - what you stopped or deleted
8. **3 interview questions** this scenario prepared you for

## Rules
- Stuck for 20 minutes? Check the official docs first, then ask me for
  **Hint 1** (nudge), **Hint 2** (bigger), or **Hint 3** (almost the answer).
- Don't paste finished DevOps files from anywhere. You write them.
- No secrets, tokens or AWS account numbers in your repo or screenshots.
- If you use EC2, stop or terminate it when you finish.
