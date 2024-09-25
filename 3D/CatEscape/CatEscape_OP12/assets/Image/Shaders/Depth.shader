Shader "Custom/ZMask"
{

    Properties {}

    SubShader
    {
        Tags
        {
            "Queue"="Geometry" "IgnoreProjector"="True" "RenderType"="Opaque"
        }


        Pass
        {
            ColorMask 0
            ZWrite On
        }
    }
}