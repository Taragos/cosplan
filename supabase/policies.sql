(
    EXISTS (
        SELECT 1
        FROM cosplay_projects
        WHERE (
                (
                    cosplay_projects.current_visibility = 'Public'::visibility
                )
                AND (objects.name = cosplay_projects.image)
            )
    )
)
