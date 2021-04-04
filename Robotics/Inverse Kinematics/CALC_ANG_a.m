function [angle_a] = CALC_ANG_a(x,y,length_a,length_b,angle_b)
%CALC_ANG_a Preforms inverse kinematics

angle_a = (atan(y/x)) + (atan((length_b * sin(angle_b))/(length_a + (length_b*cos(angle_b)))));


end