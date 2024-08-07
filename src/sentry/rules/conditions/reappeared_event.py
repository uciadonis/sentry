from collections.abc import Sequence
from datetime import datetime

from sentry.eventstore.models import GroupEvent
from sentry.models.activity import Activity
from sentry.rules import EventState
from sentry.rules.conditions.base import EventCondition
from sentry.types.activity import ActivityType
from sentry.types.condition_activity import ConditionActivity, ConditionActivityType


class ReappearedEventCondition(EventCondition):
    id = "sentry.rules.conditions.reappeared_event.ReappearedEventCondition"
    label = "The issue changes state from ignored to unresolved"

    def passes(self, event: GroupEvent, state: EventState) -> bool:
        return state.has_reappeared

    def get_activity(
        self, start: datetime, end: datetime, limit: int
    ) -> Sequence[ConditionActivity]:
        # reappearances are recorded as SET_UNRESOLVED with no user
        activities = (
            Activity.objects.filter(
                project=self.project,
                datetime__gte=start,
                datetime__lt=end,
                type=ActivityType.SET_UNRESOLVED.value,
                user_id=None,
            )
            .order_by("-datetime")[:limit]
            .values_list("group", "datetime", "data")
        )

        return [
            ConditionActivity(
                group_id=group_id,
                type=ConditionActivityType.REAPPEARED,
                timestamp=timestamp,
                data=data,
            )
            for group_id, timestamp, data in activities
            if group_id is not None
        ]
