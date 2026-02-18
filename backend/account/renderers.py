import json
from rest_framework.renderers import JSONRenderer

class CustomRenderer(JSONRenderer):
    charset = "utf-8"

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = renderer_context.get("response", None)
        status_code = response.status_code if response else None

        # Success responses
        if status_code and 200 <= status_code < 300:
            return json.dumps({
                "success": True,
                "data": data,
            })

        # Error responses
        return json.dumps({
            "success": False,
            "status_code": status_code,
            "errors": self._format_errors(data),
        })

    def _format_errors(self, data):
        """
        Normalize DRF error formats
        """
        if isinstance(data, dict):
            return data
        return {"detail": str(data)}