#!/bin/node

GIT_NAME="Lint-staged"
GIT_EMAIL="nobody@codium.team"

export GIT_AUTHOR_NAME=$GIT_NAME
export GIT_COMMITTER_NAME=$GIT_NAME
export GIT_AUTHOR_EMAIL=$GIT_EMAIL
export GIT_COMMITTER_EMAIL=$GIT_EMAIL

npm run lint-staged --no-update-notifier
