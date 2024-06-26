from __future__ import annotations

from django.http.response import FileResponse
from rest_framework.request import Request
from rest_framework.response import Response

from sentry.api.base import BaseEndpointMixin
from sentry.api.endpoints.event_attachment_details import EventAttachmentDetailsPermission
from sentry.models.files.file import File

from .base import ProjectMonitorPermission


class MonitorCheckInAttachmentPermission(EventAttachmentDetailsPermission):
    scope_map = ProjectMonitorPermission.scope_map

    def has_object_permission(self, request: Request, view, project):
        result = super().has_object_permission(request, view, project)

        # Allow attachment uploads via DSN
        if request.method == "POST":
            return True

        return result


class BaseMonitorCheckInAttachmentEndpoint(BaseEndpointMixin):
    def download(self, file_id):
        file = File.objects.get(id=file_id)
        fp = file.getfile()
        response = FileResponse(
            fp,
            content_type=file.headers.get("Content-Type", "application/octet-stream"),
        )
        response["Content-Length"] = file.size
        response["Content-Disposition"] = f"attachment; filename={file.name}"
        return response

    def get_monitor_checkin_attachment(
        self, request: Request, project, monitor, checkin
    ) -> Response:
        if checkin.attachment_id:
            return self.download(checkin.attachment_id)
        else:
            return Response({"detail": "Check-in has no attachment"}, status=404)
