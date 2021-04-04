function [angle_b] = CALC_ANG_b(x,y,length_a,length_b)
%CALC_ANG_b Preforms inverse kinematics

angle_b = -acos((x^2 + y^2 - length_a^2 - length_b^2)/(2*length_a*length_b));


end

