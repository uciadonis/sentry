class LockBackend:
    """
    Interface for providing lock behavior that is used by the
    ``sentry.utils.locking.Lock`` class.
    """

    def acquire(self, key: str, duration: int, routing_key: str | None = None) -> None:
        """
        Acquire a lock, represented by the given key for the given duration (in
        seconds.) This method should attempt to acquire the lock once, in a
        non-blocking fashion, allowing attempt retry policies to be defined
        separately. A routing key may also be provided to control placement,
        but how or if it is implemented is dependent on the specific backend
        implementation.

        The return value is not used. If the lock cannot be acquired, an
        exception should be raised.
        """
        raise NotImplementedError

    def release(self, key: str, routing_key: str | None = None) -> None:
        """
        Release a lock. The return value is not used.
        """
        raise NotImplementedError

    def locked(self, key: str, routing_key: str | None = None) -> bool:
        """
        Check if a lock has been taken.
        """
        raise NotImplementedError
