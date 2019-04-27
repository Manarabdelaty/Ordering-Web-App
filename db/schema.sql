---- User ----
CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT,
                                name VARCHAR(255) CONSTRAINT user_name_nn NOT NULL,
                                email VARCHAR(94) CONSTRAINT user_email_nn NOT NULL,
                                password VARCHAR(255) CONSTRAINT user_password_nn NOT NULL,
                                bdate DATE CONSTRAINT user_bdate_nn NOT NULL,
                                CONSTRAINT user_id_pk PRIMARY KEY(id),
                                CONSTRAINT user_email_uq UNIQUE (email)
);

---- User_Role ----
CREATE TABLE IF NOT EXISTS user_role (user_id INT,
                                role VARCHAR(10),
                                CONSTRAINT userrole_pk PRIMARY KEY(user_id, role),
                                CONSTRAINT userrole_id_fk FOREIGN KEY (user_id) REFERENCES user(id)
);


--- Record ---

CREATE TABLE IF NOT EXISTS record (id INT AUTO_INCREMENT,
                            action VARCHAR(10) CONSTRAINT record_action_nn NOT NULL,
                            admin_id INT,
                            user_id INT,
                            CONSTRAINT record_id_pk PRIMARY KEY(id),
                            CONSTRAINT record_adminId_fk FOREIGN KEY (admin_id) REFERENCES user(id),
                            CONSTRAINT record_userId_fk FOREIGN KEY (user_id) REFERENCES user(id)
);
