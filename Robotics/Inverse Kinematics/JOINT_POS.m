function [B_x,B_y] = JOINT_POS(length_a,angle_a)
%JOINT_POS Calculates position of joints 2 and 4

B_x = length_a * cos(angle_a);
B_y = length_a * sin(angle_a);


end

