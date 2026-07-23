from rest_framework import serializers


class GoogleLoginSerializer(serializers.Serializer):
    credential = serializers.CharField()


class RegisterSerializer(serializers.Serializer):

    full_name = serializers.CharField(max_length=100)

    email = serializers.EmailField()

    password = serializers.CharField(min_length=8)

    confirm_password = serializers.CharField(min_length=8)

    def validate(self, attrs):
        if attrs["password"] !=attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password":"Password Fields does not match."
                }
            )
        return attrs
    