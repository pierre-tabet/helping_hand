clc;    % Clear command window
close all;  % Close all the figures 
clear;  % Erase all existing variables
workspace; 
%Specify arm lengths
length_a = 150;           
length_b = 150;           
length_c = 150;
length_d = 150;



%%
%Specify steppermotor coordinates
r0_x = 0;
r0_y = 0;


%Specify end effector coordinate
x = 50;
y = 25;

angle_b = CALC_ANG_b(x,y,length_a,length_b);

angle_a = CALC_ANG_a(x,y,length_a,length_b,-angle_b);


[B_x,B_y] = JOINT_POS(length_a,angle_a);


plot([r0_x B_x x], [r0_y B_y y],'g');


axis equal

